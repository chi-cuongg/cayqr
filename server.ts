import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import next from "next";
import fs from "fs";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(process.cwd(), "wishes.json");

// Helper to load wishes
const loadWishes = () => {
    if (fs.existsSync(DATA_FILE)) {
        try {
            const data = fs.readFileSync(DATA_FILE, "utf-8");
            return JSON.parse(data);
        } catch (e) {
            console.error("Error loading wishes:", e);
            return [];
        }
    }
    return [];
};

// Helper to save wishes
const saveWishes = (wishes: any[]) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2));
    } catch (e) {
        console.error("Error saving wishes:", e);
    }
};

app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    let wishes = loadWishes();

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // Send initial wishes to the newly connected client (for the tree page)
        socket.emit("initial-wishes", wishes);

        socket.on("new-wish", (wish) => {
            const newWish = {
                ...wish,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            };
            wishes.push(newWish);
            if (wishes.length > 500) {
                wishes = wishes.slice(-500); // Limit to 500 wishes
            }
            saveWishes(wishes);
            io.emit("wish-added", newWish);
        });

        socket.on("reset-tree", () => {
             wishes = [];
             saveWishes(wishes);
             io.emit("initial-wishes", wishes);
             console.log("Tree reset by admin");
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    server.use((req, res) => {
        return handle(req, res);
    });

    httpServer.listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});
