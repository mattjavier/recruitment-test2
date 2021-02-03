# Skyscanner Full-Stack Recruitment Test

This a full-stack application utilizing Next.js. The frontend is styled with Material-UI components, and MongoDB is used to serve as the database. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Testing

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

To test the database Schemas:
```bash
npm run test
```

## Usage

Users can view a list of flight itineraries from the root page. Each `Itinerary` is made up of `Legs` (or flights) with the corresponding data:
- departureTime
- arrivalTime
- departureAirport
- arrivalAirport
- duration
- stops (potentially)
- airline (name & ID)

Each `Itinerary` includes: 
- 2 `Legs`
- price
- flight agent
- agent's rating

In the top navbar, there are two `Links`: 
- Add Leg
- Add Itinerary

User input is required for these two pages. After filling out the form, pressing the `Submit` button adds a leg or itinerary to the database. 

On the main admin page, the user can filter the list of itineraries based on the agent. In doing so, the `Total Price` and `Average Price` for all itineraries displayed will change.

Each leg and itinerary has an edit or delete button. If the `Edit` button is pressed (Pen Icon), then the user is taken to an `Edit` page for either Legs or Itineraries. Data for each leg or itinerary is pre-populated with the current selections, but modifications can be made. Pressing the `Submit` button again `PUTS` a modified leg or itinerary to the database. If the `Delete` button is pressed (Trash Icon), then the user will be shown the selected leg or itinerary. Another `Delete` button is provided. If pressed, the corresponding leg or itinerary is deleted from the database. If a leg is deleted, and there exists an itinerary that includes that leg, the corresponding itinerary will be deleted as well.




