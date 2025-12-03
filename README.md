# 🎁GiftListPal
A friendly gift list app to help friends and families coordinate gift giving for parties, holidays, or wherever else gifts are given. Built with React, TypeScript, and NextJs. This app is the capstone project for my software engineering bootcamp but also a passion project I intend to eventually deploy.

## 💪Motivation
GiftListPal began as an idea to help my family coordinate gift giving. We usually share gifts lists with eachother via e-mail. Inevitably, 2 people purchase the same gift, or purchase the wrong gift. Many of my design decisions were informed by my experiences of pain points my own family has dealt with.

## 📦 Technologies
- React
- TypeScript
- NextJs
- Redux Toolkit
- Tailwindcss
- Prisma
- Shadcn-ui
- NextAuth
- Formik
- Resend

## 🦄 Features
Here's what you can do with GiftListPal:
- **Create Events**: Invite people to gifting events via e-mail like birthday parties or holidays.
- **Make WishLists**: Add gifts you'd like to receive to your wishlist within the event.
- **Make Recommendations**: Suggest gifts that others might like to purchase for others.
- **Reserve Gifts**: Mark the gifts you'd like to purchase to let others know they're unavailable.
- **Smart Visibility**: Gift recommendations and reservations for a recipient visible to shoppers but hidden from the recipient.
- **Accessiblity**: Large fonts, easy to click buttons, and intuitive menus to assist family members of all ages.
- **Simple sign in**: GiftListPal uses Magic Links for signing in to save older users from the hassle of forgotten or difficult to type passwords.

## 👨‍🍳 The Process

I started by building out the basic form pages for users to do things like create events and add gifts. I used my familiarity with React as a comfortable place to begin learning TypeScript as well as NextJS.

Next, I spent time learning how NextJS handles routing in order to navigate between pages. I also introduced  Redux Toolkit as well as PostgreSQL to handle state management and querying my database. Later, I took the opportunity to learn Prisma to introduce an ORM which I leveraged to more easily perform database queries.

At this point, I began looking at protecting my routes with Auth.js (formerly NextAuth). I used Resend as my email provider to save myself from any e-mail delivery mistakes early on. While looking into Resend, I discovered the option of using Magic Links which require just an e-mail address to sign in with no password. After doing more research, I decided this was ideal for my app since dealing with passwords and forgotten password forms can be a pain for anyone, but especially older or less tech saavy users.

Next, I built out the email inivitation system which allows users to invite people directly to events. Initially, users needed to create an account before accepting the email invite, but later, I simiplified this process allowing both to be performed at the same time.

Once the invite system was in place, I was free to focus on the meat and potatoes of the app, namely adding gifts to wishlists allowing users to reserve gifts. I spent time ensuring that users only had the information they needed as far as when gifts were recommended or reserved. You don't want to spoil any surprises!

I spent time on the design, making fonts large and legible with icons and badges to give users plenty of feedback on whether gifts were wishlisted by the recipient, recommended by another participant, or reserved and no longer available. 

## 📚What I Learned

During this project, I've learned several technologies that were new to me.

#### TypeScript
- I've been able to introduce type safety through GiftListPal. It definitely helps to document the inputs and outputs of each function and catch issues before they become a nightmare to debug later.

#### React Lifecycle
- The React component lifecycle is definitely something I've felt weak on in terms of my understanding. Working through this project has given me a better understanding of mounting, unmounting, when hooks run, when things are rendered, etc. Still a work in progress, but I'm getting there!

#### NextJS
- I was completely unfamiliar with NextJS prior to starting this project. I've been amazed at just how much of an all in one solution it is. My favorite part was building out my own internal API using route.ts files and sending requests from my RTK thunks.

#### RESTful APIs
- I've built REST APIs before but I really dove into making mine as resilient as possible. Handling as many error states as I could think of, returning the correct status codes, 

#### Prisma
- First time using Prisma. I migrated my existing PostgreSQL database schema to a Prisma schema and began letting prisma manage everything. Changes to the database are now done with migrations. I've dabbled with ORMs before but never to this depth. I was really surprised at just how convenient it was to included various pieces of data from the database in my queries. It was a bit of work to get set up, but once it is, it really makes life easier.

## 🔍Preview
<table style="border-collapse: separate; border-spacing: 20px 10px;">
  <thead>
    <tr>
      <th style="padding: 10px; font-size: 20px; text-align: center;">Keep Track of Events</th>
      <th style="padding: 10px; font-size: 20px; text-align: center;">Add Gifts</th>
      <th style="padding: 10px; font-size: 20px; text-align: center;">Reserve Gifts</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 10px; text-align: center;">
        <img src="https://github.com/user-attachments/assets/0f471d2b-9733-4fe2-bd68-8de8f5d280b1" width="250" />
      </td>
      <td style="padding: 10px; text-align: center;">
        <img src="https://github.com/user-attachments/assets/343262bc-6a51-4c46-815b-b512c9f02973" width="250" />
      </td>
      <td style="padding: 10px; text-align: center;">
        <img src="https://github.com/user-attachments/assets/6fac8440-3a96-45f1-810e-1a9ffc611a6d" width="250" />
      </td>
    </tr>
  </tbody>
</table>


