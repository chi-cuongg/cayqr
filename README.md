# Wish Tree

An interactive real-time web application where visitors can submit messages (wishes) via their smartphones, which immediately display as animated leaves on a large digital screen.

## Technologies Used

*   **Frontend**: React / Next.js
*   **Backend**: Custom Node.js + Express Server
*   **Real-time Communication**: Socket.io
*   **Animations**: Framer Motion
*   **Deployment**: Docker + GitHub Actions

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser:
   *   [http://localhost:3000](http://localhost:3000) - Main Landing Page
   *   [http://localhost:3000/tree](http://localhost:3000/tree) - The Big Screen Tree Display
   *   [http://localhost:3000/submit](http://localhost:3000/submit) - The Mobile Submission Form
   *   [http://localhost:3000/qr](http://localhost:3000/qr) - QR Code referencing the submission form

## Automated Deployment (CI/CD)

This project is configured with a complete **GitHub Actions** CI/CD pipeline. Every push to the `main` branch will automatically:

1. Check out the code.
2. Install dependencies & run build checks.
3. Build a production Docker image.
4. Push the image to Docker Hub (or GHCR).
5. Connect to your deployment server via SSH.
6. Pull the latest image and restart the container.

### Configuring GitHub Secrets

To make the auto-deployment work, you **must** configure the following Repository Secrets in your GitHub project (`Settings` > `Secrets and variables` > `Actions` > `New repository secret`):

| Secret Name | Description | Example |
| :--- | :--- | :--- |
| `DOCKER_USERNAME` | Your Docker registry username (e.g., Docker Hub). | `johndoe` |
| `DOCKER_PASSWORD` | Your Docker registry password or Personal Access Token. | `dckr_pat_xxx...` |
| `SERVER_HOST` | The IP address or domain name of your deployment server. | `203.0.113.1` |
| `SERVER_USER` | The SSH username for your deployment server. | `ubuntu` or `root` |
| `SERVER_SSH_KEY` | The Private SSH Key (`-----BEGIN RSA PRIVATE KEY-----...`) used to access the server. | *(Your private key content)* |

Once these secrets are added, pushing code to the `main` branch will deploy your updates automatically.
