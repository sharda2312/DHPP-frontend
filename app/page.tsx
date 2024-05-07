import { Component, useState } from 'react'


import Dashboard from './components/Dashboard'
export default async function Home() {


  return (
    <main>
      <div className="flex  justify-center items-center">
        <Dashboard />
      </div>
    </main>
  )
}
