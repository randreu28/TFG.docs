---
title: TriArt
pagination: 3.0
---

# 3. TriArt

[![Image](/img/triart.png)](https://tfg-triart.vercel.app/)

<div class="flex justify-between w-full">
  <a href="https://github.com/randreu28/TFG.triart">Repository</a>
  <a href="https://tfg-triart.vercel.app/">Live version</a>
</div>

> There is a test user set up in place in case you might want to check out the project without registering:

```bash
email: user@example.com
password: secret
```

## 3.0.1 Installation

To set up the project, follow these installation steps:

```bash
git clone https://github.com/randreu28/TFG.triart
cd TFG.triart
yarn install
yarn dev
```

> Caution! This is a Full-Stack application. For security reasons, the environment variables needed to access the database are not public access.
> <br/> <br/>
> To run this locally, either create your [supabase database](https://supabase.com/) instance or ask for the private keys at the [author's contact page](https://www.randreu.dev/#contact-me).

## 3.0.2 Overview

TriArt is a platform where you can upload your 3D artwork and share them with the world. It creates unique links for each model, and the viewer can interact with them with a given set of options. The authors can monitor the model's views and visibility, should they prefer to keep some of their models private.

This project was made with [Next13](https://nextjs.org/), with the app directory. The styling was done with [TailwindCSS](https://tailwindcss.com/) and [HeadlessUI](https://headlessui.com/), and the database with [Supabase](https://supabase.com/). All of these pieces work together to make the project possible, but the aspect we will focus on will be the 3D side of it.

> The reader needs not prior knowledeg of these technologies to follow along. Whenever there are things specific to these techonologies, the documentation will go over them. This documentation's goal is on explaining the decision-making of it all, not the intricacies of the chosen stack.
