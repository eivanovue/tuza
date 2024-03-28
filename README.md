<br />
<div align="center">

  <h3 align="center">TUBIFY</h3>

<a href="https://eivanovue.github.io/tuza/">View Demo</a>

</div>

## About The Project


<div style="display: flex; flex-wrap: nowrap; width: 100%;">
  <img src="https://i.ibb.co/gvBM2by/Tubify-Home-page.png" width="32%">
  <img src="https://i.ibb.co/rk0n4qL/Tubify-Live-Depratures-page.png" width="32%">
  <img src="https://i.ibb.co/PrkMd0v/Tubify-Arrivals-page-1.png" width="32%">
</div>

<a href="https://imgbb.com/"><img src="" alt="68747470733a2f2f692e6962622e636f2f625831427344512f5475626966792d4c6976652d446570726174757265732d7061" border="0" /></a>
Welcome to Tubify, your trusty companion for navigating the bustling world of London's tube system! Tubify is your go-to mobile-friendly web app, designed to keep you in the loop with all the juicy details about your tube commute. With Tubify by your side, you can bid farewell to the woes of missing your train and embrace every journey with confidence!

Tubify boasts a seamless experience, providing you with accurate and up-to-date line statuses and departure times. Say goodbye to the days of uncertainty and hello to smooth, stress-free commuting!

## Assumptions and Decisions

Initially, I found the terminology around "branches" in the technical assessment description a bit unclear. Looking into this further, I decided to trust my instincts and focus on creating something that would resonate with the everyday Londoner – someone just like me. Recognising the importance of accessing data from the TFL APIs to provide valuable insights, I began by constructing the "Live Departures" section, which presents all stops (stations) along a specific line. Additionally, I implemented functionality where clicking on a specific line redirects you to a page where you can view trains on each platform along with their respective arrival times. I do hope this is in line with what was expected of me.  

For this project, I chose React, particularly embracing Vite for its streamlined approach. By eliminating unnecessary dependencies and bloatware, Vite ensures faster builds, a smoother developer experience, and reduced vulnerabilities.

For optimal type safety throughout the project, I made the decision to utilise TypeScript. By leveraging TypeScript, we can catch errors at compile time, ensuring a more robust and reliable codebase. TypeScript empowers developers with features like static typing, type inference, and interfaces, allowing for clearer code.

One of the standout features of the application, in my opinion, is the implementation of a Provider pattern. By wrapping the router, it eliminates the need for an extra request to retrieve Line status each time you switch between pages. Moreover, I've fully embraced the component composition pattern, which not only enables the creation of reusable components but also facilitates easier testing.

Things I would improve or do differently if I had the time:
* Integrate socket technology to deliver real-time updates to the client. This involves creating a backend service and establishing a connection between the two using a library like socket.io. Furthermore, I would implement a 10-second interval to ensure users receive the latest information without having to manually refresh the page.
* Create an API subscription/account that would increase the rate limiting of the TFL API from 50 to 500 requests per minute.
* Look at the non-functional requirements such as security best practices, accessibility and availability.
* Add integration and end-to-end tests.

## Built With

- React
- Vite
- Typescript
- React Testing Library
- Jest

## Getting Started

This guide will walk you through the process of cloning, running, and testing a Tubify to get you up and running in no time.

### Prerequisites

- Node 18

### Clone the Repository and navigate into directory

Start by cloning the repository. Open your terminal and navigate to the directory where you want to clone the repository. Then, run the following command:

```sh
git clone git@github.com:eivanovue/tuza.git
cd tuza
```

### Installation

Before running the application or running tests, you'll need to install the project dependencies. In the root directory of the repository, run the following command:

```sh
npm install
```

This command will install all the necessary dependencies specified in the `package.json` file.

### Running Tubify

After installing the dependencies, you can run Tubify locally. Use the following command:

```sh
npm run dev
```

This command will start the development server and open your default web browser to view the application. You can also access the application at `http://localhost:5173`.

### Testing

To ensure code quality and functionality. Run the tests using the following command:

```sh
npm run test
```
