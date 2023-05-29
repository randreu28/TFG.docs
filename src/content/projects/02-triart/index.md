---
title: TODO
---

# TriArt

:::info
Check out the live version [here](https://tfg-triart.vercel.app/). You can log in as a demo user:

```bash
email: user@example.com
password: secret
```

:::

[![image](/img/triart.png)](https://tfg-triart.vercel.app/)

## Installation

:::caution
This is a Full-Stack application. For security reasons, the environment variables needed to access the database are not public access.

To run this locally, either create your [supabase database](https://supabase.com/) instance or ask for the private keys at randreu28@gmail.com
:::

```bash
git clone https://github.com/randreu28/TFG.triart
cd TFG.triart
yarn install
yarn dev
```

## Overview

TriArt is a platform where you can upload your 3D artwork and share them with the world. It creates unique links for each model, and the viewer can interact with them with a given set of options. The authors can monitor the model's views and visibility, should they prefer to keep some of their models private.

This project was made with [Next13](https://nextjs.org/), with the app directory. The styling was done with [TailwindCSS](https://tailwindcss.com/) and [HeadlessUI](https://headlessui.com/), and the database with [Supabase](https://supabase.com/). All of these pieces work together to make the project possible, but the aspect we will focus on will be the 3D side of it.

:::tip
You don't need to know all of these technologies to follow along. Whenever there are things specific to these tech stacks, We'll go over them. This documentation's goal is on explaining the decision-making of it all, not the intricacies of the chosen stack.
:::
