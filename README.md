# Tropee QA challenge

Tropee has created an app to help the kitties. Since we did it in a rush we don't have any tests for it.
We would like to add some tests so we feel safer when pushing new code.

## Requirements

### Frontend

Write automated tests to cover the event listing and event details page. Cover as much detail of the page as you see fit.

### Backend

Write tests to cover the event creation endpoint.

### Event creation endpoint
Path: `/events`
Method: POST
Body: 
```json
{
  "name": "Help the kittens",
  "category": "Adoptions"
}
```

Name has to be at least 3 characters and category can be one of the values `Adoptions` or `Fundraising`

## How to run the application

`docker-compose up`
