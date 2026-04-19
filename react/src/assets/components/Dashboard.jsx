import React, { useEffect, useState } from 'react'
import axiosClient from "../../axios-client";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0
  })

  const [users, setUsers] = useState([])

  useEffect(() => {
    // Stats (tu peux créer route /dashboard)
    axiosClient.get('/dashboard').then(({ data }) => {
      setStats(data)
    }).catch(() => {
      // fallback si API non prête
      setStats({ users: 10, orders: 5, revenue: 1000 })
    })

    // Users récents
    axiosClient.get('/users').then(({ data }) => {
      setUsers(data.data || data)
    })
  }, [])

  return (
    <div>
      
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Cards */}
      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        
        <div className="card">
          <h3>Users</h3>
          <h2>{stats.users}</h2>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <h2>{stats.orders}</h2>
        </div>

        <div className="card">
          <h3>Revenue</h3>
          <h2>${stats.revenue}</h2>
        </div>

      </div>

      {/* Table */}
      <div className="card">
        <h3>Recent Users</h3>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? users.slice(0, 5).map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}