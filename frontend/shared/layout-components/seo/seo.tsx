import React from "react";
import Head from "next/head";
import favicon from "../../../public/assets/images/brand-logos/favicon.ico";

const Seo = ({ title }: any) => {
  let i = `Mekong AI Social Media - ${title}`;

  return (
    <Head>
      <title>{i}</title>
      <link href={favicon.src} rel="icon"></link>
      <meta name="description" content="Mekong AI Social Media Bot" />
      <meta name="author" content="Mekong AI Social Media Bot" />
      <meta
        name="keywords"
        content="nextjs admin template, nextjs template, admin, next js tailwind, nextjs, typescript, tailwind nextjs, nextjs typescript, template dashboard,tailwind css, admin dashboard template, tailwind dashboard, dashboard, tailwind"
      ></meta>
    </Head>
  );
};

export default Seo;
