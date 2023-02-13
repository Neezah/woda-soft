import type { NextPage } from 'next'
import { useState, useEffect } from "react"
import Head from 'next/head'
import Image from 'next/image'
import axios from "axios";
import UserTable from '../component/UserTable';

const Home: NextPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getResult = async () => {
      const response = await axios.get('https://randomuser.me/api/1.1/?results=15')
      const data = await response.data.results
      console.log('bug',data)
      setUsers(data)
    }

    getResult()

    // fetch('https://randomuser.me/api/1.1/?results=15')
    //   .then(response => response.json())
    //   .then(data => setUsers(data.results));
  }, []);

  const isLoading = users === null;

  return (
    <main>
      <div className="table-container">
        <div className="uk-overflow-auto">
          <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
            <thead>
              <tr>
                <th className="uk-table-shrink" />
                <th className="uk-table-shrink" />
                <th className="uk-table-shrink">Avatar</th>
                <th>Fullname</th>
                <th>City</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                : users.map((user, index) =>
                    <UserTable key={index} index={index + 1} user={user} />
                  )
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Home
