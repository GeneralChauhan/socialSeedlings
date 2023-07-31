# Social Seedlings - Photo Feed App

Social Seedlings is a web application that allows users to view random photos from Unsplash and explore photos uploaded by specific users. The app provides two main views: the News Feed view and the User Profile view.

## Features

### News Feed View
- Fetches random photos from Unsplash API using the `get-a-random-photo` endpoint.
- Displays the photos in a grid structure view.
- Each photo includes the photo description and the number of likes.
- Users can click on the User Info section to view the user's profile page.

### User Profile View
- Fetches user details based on the provided username from the Unsplash API.
- Displays the user's profile image, name, and username.
- Shows all the photos added by the user in a grid structure view.
- Each photo includes the photo description and the number of likes.
- Provides an option to switch to the list view of the images.


## Installation

1. Clone the repository: `git clone https://github.com/GeneralChauhan/social-seedlings.git`
2. Change directory to the project folder: `cd socialSeedlings`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`
2. Open your browser and visit `http://localhost:3000` to access the app.

## Technologies Used

- Next: A JavaScript framework based on React for building user interfaces.
- Axios: A promise-based HTTP client for making API requests.
- CSS: Used for styling the app.
- MUI Icons: For LightWeight SVG Icons


## Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
Although this is just a Submission Assignment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The app uses the Unsplash API to fetch random photos and user details. (Link to Unsplash API documentation: [Unsplash API Documentation](https://unsplash.com/documentation#get-a-random-photo))


