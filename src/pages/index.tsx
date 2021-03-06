import React from 'react';
import Link from 'next/link';
import Layout from '~/components/layout';

const IndexPage = () => (
  <Layout title="">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
