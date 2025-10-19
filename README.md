# 🎉 Pardy App

A modern event management application built with Next.js 14, featuring user authentication, event creation, RSVP management, and real-time updates.

## 🚀 Live Demo

**[View Live Demo](https://pardy-app.vercel.app)**

## ✨ Features

- **User Authentication**: Secure sign-up and sign-in with JWT tokens
- **Event Management**: Create, edit, and manage events with detailed information
- **RSVP System**: Attendees can RSVP with status options (going, not-going, maybe)
- **Dashboard**: Comprehensive dashboard with event overview and activity tracking
- **Guest Management**: Track and manage event attendees
- **Responsive Design**: Modern UI built with NextUI and Tailwind CSS
- **Real-time Updates**: Live data synchronization across the application

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: SQLite with Drizzle ORM
- **Authentication**: JWT with bcrypt for password hashing
- **UI Components**: NextUI (React component library)
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
pardy_app_next_js/
├── actions/                 # Server actions for auth and events
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   └── dashboard/         # Main application dashboard
├── components/            # Reusable React components
│   └── ui/               # UI components
├── db/                   # Database configuration and schema
├── utils/                # Utility functions
├── public/               # Static assets
└── images/              # Application images
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pardy_app_next_js
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   DATABASE_URL="your-database-url"
   JWT_SECRET="your-jwt-secret"
   ```

4. **Set up the database**

   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed the database with sample data

## 🗄️ Database Schema

The application uses the following main entities:

- **Users**: User accounts with email and password
- **Events**: Event information including location, date, and status
- **Attendees**: Guest information for events
- **RSVPs**: Response tracking for event invitations

## 🔐 Authentication

The app implements secure authentication using:

- JWT tokens for session management
- bcrypt for password hashing
- Protected routes with middleware
- Server-side session validation

## 🎨 UI/UX Features

- **Dark Mode**: Built-in dark theme support
- **Responsive Design**: Mobile-first approach
- **Modern Components**: NextUI component library
- **Smooth Animations**: Framer Motion integration
- **Intuitive Navigation**: Clean and organized layout

## 🚀 Deployment

The application is deployed on Vercel and can be accessed at [pardy-app.vercel.app](https://pardy-app.vercel.app).

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [NextUI](https://nextui.org/)
- Database ORM by [Drizzle](https://orm.drizzle.team/)
- Icons by [Lucide](https://lucide.dev/)

---

**Happy Event Planning! 🎉**
