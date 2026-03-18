# Hướng dẫn triển khai CayQR lên AWS EC2

Dưới đây là các bước để triển khai dự án bằng Docker trên một máy chủ EC2.

## Bước 1: Khởi tạo EC2 Instance
1. Đăng nhập vào AWS Console -> EC2 -> Launch Instance.
2. Chọn OS: **Ubuntu 22.04 LTS** (Khuyên dùng).
3. Instance Type: **t3.small** (hoặc `t3.medium` như đã đề xuất).
4. Key pair: Tạo mới hoặc chọn key pair có sẵn để SSH.
5. Security Group:
   - Cho phép **SSH (22)** từ IP của bạn.
   - Cho phép **HTTP (80)** và **Custom TCP (3000)** từ mọi nơi (0.0.0.0/0).

## Bước 2: Cài đặt Docker trên EC2
Sau khi SSH vào server, chạy các lệnh sau:
```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```
*(Lưu ý: Sau khi chạy lệnh usermod, bạn cần log out và log in lại để có quyền chạy docker không cần sudo)*

## Bước 3: Đưa code lên Server
Bạn có thể dùng Git hoặc SCP. Ví dụ dùng Git:
```bash
git clone <your-repo-url>
cd cayqr
```

## Bước 4: Chạy ứng dụng
SỬ dụng Docker Compose để khởi chạy:
```bash
docker-compose up -d
```

## Bước 5: Cấu hình Persistence (Dữ liệu)
Ứng dụng sử dụng file `wishes.json` để lưu trữ. 
- Trong `docker-compose.yml`, thư mục hiện tại được mount vào container. 
- Dữ liệu sẽ được lưu tại file `wishes.json` ngay trên máy chủ EC2, đảm bảo không bị mất khi container restart.

## Bước 6: Truy cập ứng dụng
Truy cập qua địa chỉ: `http://<EC2-Public-IP>:3000`

---
### Lưu ý nâng cao:
- **HTTPS**: Nên dùng **Nginx** làm Reverse Proxy hoặc **AWS ALB** để cấu hình SSL/TLS (HTTPS).
- **Domain**: Trỏ domain của bạn về Public IP của EC2.
- **PM2**: Nếu không dùng Docker, bạn có thể chạy trực tiếp bằng PM2: `npm install -g pm2 && pm2 start server.ts --interpreter tsx`.
