import React from 'react'
import { Table, Row, Col, CardBody, CardHeader, Card } from 'reactstrap'

export default class Referensi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/users') // Ganti URL sesuai endpoint kamu
      .then((res) => res.json())
      .then((data) => {
        this.setState({ users: data })
      })
      .catch((error) => {
        console.error('Gagal mengambil data:', error)
      })
  }

  render() {
    const { users } = this.state

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader className="bg-primary text-white">
                <strong>Data Pengguna</strong>
              </CardHeader>
              <CardBody>
                <div className="table-responsive">
                  <Table striped hover bordered responsive className="text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status || 'Aktif'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">Tidak ada data</td>
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
}
