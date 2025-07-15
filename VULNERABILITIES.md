# Vulnerabilities Found

This document lists the security vulnerabilities found in the application.

### 1. **Broken Authentication and Session Management:**

*   **`SessionController.create`**: The login process is insecure. It only requires the `id` of the ONG to create a session. There is no password or other secret. This means anyone who knows an ONG's ID can log in as that ONG.
*   **`ProfileController.index`**, **`IncidentsController.create`**, **`IncidentsController.delete`**: These controllers use the `authorization` header to identify the logged-in ONG. However, since the login process is weak, this authentication is not reliable.

### 2. **Insecure Direct Object References (IDOR):**

*   **`IncidentsController.delete`**: This endpoint is intended to allow an ONG to delete its own incidents. It checks if the `ong_id` of the incident matches the `ong_id` in the `authorization` header. However, there's a potential vulnerability. If an attacker knows the `id` of an incident belonging to another ONG, they can still try to delete it. The check `if (incident.ong_id != ong_id)` is correct, but the overall security of the application is weak due to the authentication issues.

### 3. **Lack of Input Validation:**

*   **`OngController.create`**: The `create` function receives `nome`, `email`, `whatsapp`, `city`, and `uf` from the request body and inserts them directly into the database. There's no validation to ensure that the data is in the correct format. For example, the `email` field could contain an invalid email address, or the `whatsapp` field could contain non-numeric characters. This could lead to data corruption or other unexpected behavior.
*   **`IncidentsController.create`**: Similarly, the `create` function for incidents doesn't validate the `title`, `description`, or `value`.

### 4. **Exposure of Sensitive Data:**

*   **`OngController.listAll`**: This endpoint returns all data for all ONGs, including their `id`, `nome`, `email`, `whatsapp`, `city`, and `uf`. This information could be considered sensitive and should not be publicly exposed.
*   **`IncidentsController.listAll`**: This endpoint returns detailed information about incidents, including the ONG's `nome`, `email`, `whatsapp`, `city`, and `uf`. This also exposes sensitive information.

### 5. **Cross-Site Scripting (XSS):**

*   The application does not appear to be sanitizing user input before storing it in the database and rendering it in the frontend. This could allow an attacker to inject malicious scripts into the application. For example, an attacker could create an ONG with a `nome` containing a `<script>` tag. When this ONG's name is displayed on the frontend, the script would be executed in the user's browser.
