import React, { useState } from 'react'
import { slideDown, slideUp } from "../utils/anim"

type Props = {}

function formatDate(str: string) {
  return str.substr(0, 10);
}

function capitalize(str: string) {
  return str.split(' ').map(s => {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }).join(' ');
}

interface IUserTable {
  index: number;
  user: any;
  key: any
}

interface IRef {
  expanderBody: any
}

const UserTable = (props: IUserTable) => {
  const { user, index } = props
  const [expanded, setExpanded] = useState(false)

  const toggleExpander = (e: any) => {
    if (e.target.type === 'checkbox') return

    if (!expanded) {
      setExpanded(true);
      if (refs.expanderBody) {
        slideDown(refs.expanderBody)
      }
    } else {
      slideUp(refs.expanderBody, {
        onComplete: () => { setExpanded(false); }
      })
    }
  };

  const refs: IRef = {
    expanderBody: undefined
  };

  return [
    <tr key="main" onClick={toggleExpander}>
      <td><input className="uk-checkbox" type="checkbox" /></td>
      <td className=''>{index}</td>
      <td><img className="uk-preserve-width uk-border-circle" src={user.picture.thumbnail} width={48} alt="avatar" /></td>
      <td>{capitalize(user.name.first + ' ' + user.name.last)}<br /><small>{user.email}</small></td>
      <td>{capitalize(user.location.city)} ({user.nat})</td>
      <td>{formatDate(user.registered)}</td>
    </tr>,
    expanded && (
      <tr className="expandable" key="tr-expander">
        <td className="uk-background-muted" colSpan={6}>
          <div ref={(el) => (refs.expanderBody = el)} className="inner uk-grid">
            <div className="uk-width-1-4 uk-text-center">
              <img className="uk-preserve-width uk-border-circle" src={user.picture.large} alt="avatar" />
            </div>
            <div className="uk-width-3-4">
              <h3>{capitalize(user.name.first + ' ' + user.name.last)}</h3>
              <p>
                Address:<br />
                <i>
                  {capitalize(user.location.street)}<br />
                  {user.location.postcode} {capitalize(user.location.city)}<br />
                  {user.nat}
                </i>
              </p>
              <p>
                E-mail: {user.email}<br />
                Phone: {user.phone}
              </p>
              <p>Date of birth: {formatDate(user.dob)}</p>
            </div>
          </div>
        </td>
      </tr>
    )
  ]
}

export default UserTable