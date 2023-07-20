# ForgerockPoc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.2.

## Development server

### Local Development Server

To run the application locally, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/your/repository.git
```

2. Install the dependencies:

```shell
cd forgerock-poc
npm install
```
### Building and Running with HTTPS

To build and run the application using HTTPS locally, follow these steps:

1. Generate a self-signed SSL certificate:

```shell
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```
Place the generated files into the todo-api/certs directory.

2. Update your hosts file:

  - **Windows**: Open the hosts file located at `C:\Windows\System32\drivers\etc\hosts` in a text editor and add the following line:

    ```
    127.0.0.1 sdkapp.example.com
    ```

  - **Mac/Linux**: Open the hosts file located at `/etc/hosts` in a text editor and add the following line:

    ```
    127.0.0.1 sdkapp.example.com
    ```

   This step is necessary to map the domain `sdkapp.example.com` to your local machine.

3. Start the Node.js server and the file watch process:

```shell
npm run start
```

```shell
npm run nodemon-watch
```

4. Open your browser and navigate to `https://sdkapp.example.com:8443` to access the application with HTTPS.

The watch script uses Nodemon to monitor changes in the server-side code. Nodemon automatically restarts the Node.js server whenever there are changes, providing a smoother development experience.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Further help

To get more help on the Angular CLI, use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

For more details specific to this project's setup, please refer to the README.md file in the project repository.
