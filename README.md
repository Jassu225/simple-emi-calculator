This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install

#### step 1: 

Clone this repository using this link: [https://github.com/Jassu225/simple-emi-calculator](https://github.com/Jassu225/simple-emi-calculator)

#### step 2:

Install all the dependencied by executing the following command in the terminal.

### `npm install` or `npm i` or `yarn install` or `yarn`

#### step 3:
Run `npm run devstart` or   `yarn devstart` to run the app in development mode.

## About the app

This app is a simple EMI calculator built using React. Takes two inputs `loan amount (in USD)` and `duration (in months)`. Uses an [api](https://ftl-frontend-test.herokuapp.com/interest) to fetch the `interest rate` and `monthly payment`.

The app is divided into `three sections`. 

The left section is the `history` section. Shows the previous selections with the most recent selection at the top. Uses the `local storage` of the browser to store & retrieve the data.

The middle one is the `selections` section.  The user interacts with this part of the page to get the EMI info.

The section at the very right is the `EMI Info` section. As the name describes, this section shows the EMI info.

To handle network-related errors, an `error handling` mechanism is used. A snack bar appears ( and disappears after a timeout ) when a network-related error occurs. 

Below are the production links. Check it out.

[https://jassu225.github.io/simple-emi-calculator/](https://jassu225.github.io/simple-emi-calculator/)

[https://emi-calc.herokuapp.com/](https://emi-calc.herokuapp.com/)

## Available Scripts

In the project directory, you can run:

### `npm run devstart` or `yarn devstart`

Runs the app in the development mode.<br>

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

You will also see any lint errors in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm start` or `yarn start`

Runs the app in the production mode using the latest build.

Happy scripting :stuck_out_tongue_winking_eye: !!!

This repo is licensed under `MIT`.