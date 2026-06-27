import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Row, Col, CardBody, CardHeader, Card } from 'reactstrap'

const Referensi = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('/api/transaksi/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Gagal:', err))
  }, [])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader className="bg-primary text-white">
              <strong>Data Customer</strong>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <Table striped hover bordered responsive className="text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Nama</th>
                      <th>Game ID</th>
                      <th>Server</th>
                      <th>No HP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.nama}</td>
                          <td>{user.game_id}</td>
                          <td>{user.server}</td>
                          <td>{user.nohp || '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">Tidak ada data</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Referensi
