# Phonebook Backend API

This repository hosts the backend API for a simple phonebook application, built as part of the Full Stack Open course (FSO). It manages contact information, including names and phone numbers.

## Deployment Status

The backend is deployed and available at the following base URL:

**Base URL:** https://fso-phonebook-backend-production.up.railway.app

## API Endpoints

All endpoints use the base URL provided above.

### 1. Get All Persons

Retrieves a list of all contact entries currently stored in the phonebook.

| Method                | Path           | Description                                                           |
| --------------------- | -------------- | --------------------------------------------------------------------- |
| **GET**               | `/api/persons` | Returns an array of all person objects.                               |
| **Example Response:** |                | `[ { "id": 1, "name": "Arto Hellas", "number": "040-123456" }, ... ]` |

### 2. Get Person by ID

Retrieves detailed information for a specific contact using their unique ID.

| Method            | Path               | Description                                   |
| ----------------- | ------------------ | --------------------------------------------- |
| **GET**           | `/api/persons/:id` | Returns the person object matching the `:id`. |
| **Example Path:** |                    | `/api/persons/1`                              |

### 3. Add a New Person

Creates a new contact entry in the phonebook. The request body must contain the `name` and `number` fields.

| Method   | Path           | Description         |
| -------- | -------------- | ------------------- |
| **POST** | `/api/persons` | Adds a new contact. |

**Request Body (JSON):**
{
"name": "Ada Lovelace",
"number": "39-44-5323523"
}

**Required Parameters:**

| Parameter | Type   | Required | Notes                            |
| --------- | ------ | -------- | -------------------------------- |
| `name`    | String | Yes      | The full name of the contact.    |
| `number`  | String | Yes      | The phone number of the contact. |

### 4. Delete a Person by ID

Removes a contact entry from the phonebook using their unique ID.

| Method            | Path               | Description                                   |
| ----------------- | ------------------ | --------------------------------------------- |
| **DELETE**        | `/api/persons/:id` | Deletes the person object matching the `:id`. |
| **Example Path:** |                    | `/api/persons/4`                              |
