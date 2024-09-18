import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'; // For interactive menus
import * as Checkbox from '@radix-ui/react-checkbox'; // Optional: For selecting rows
import { CheckIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'; // Optional: For checkbox styling
import "@/css/styles.css"; // Adjust the path if necessary

const AdminConsoleView: React.FC = () => {
    
  const users = [
    {
      id: 1,
      name: 'A',
      age: 30,
      occupation: 'None',
      location: 'Nowhere',
    },
    {
      id: 2,
      name: 'B',
      age: 25,
      occupation: 'No',
      location: 'Nah',
    },
    {
      id: 3,
      name: 'C',
      age: 35,
      occupation: 'Rice farmer',
      location: 'Asia',
    },
    {
      id: 1,
      name: 'A',
      age: 30,
      occupation: 'None',
      location: 'Nowhere',
    },
    {
      id: 2,
      name: 'B',
      age: 25,
      occupation: 'No',
      location: 'Nah',
    },
    {
      id: 3,
      name: 'C',
      age: 35,
      occupation: 'Rice farmer',
      location: 'Asia',
    },
    {
      id: 1,
      name: 'A',
      age: 30,
      occupation: 'None',
      location: 'Nowhere',
    },
    {
      id: 2,
      name: 'B',
      age: 25,
      occupation: 'No',
      location: 'Nah',
    },
    {
      id: 3,
      name: 'C',
      age: 35,
      occupation: 'Rice farmer',
      location: 'Asia',
    },
  ];
    
    return (
      <div>
        <h1>Admin Console</h1>
        <p>Welcome to the console!</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black'}} >
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Occupation</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderRight: '1px black', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                {/* Select Checkbox */}
                <td>
                  <Checkbox.Root className="CheckboxRoot">
                    <Checkbox.Indicator className="CheckboxIndicator">
                      <CheckIcon />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                </td>
                
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.occupation}</td>
                <td>{user.location}</td>

                {/* DropdownMenu for Actions */}
                <td>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <button style={{ padding: '5px', borderRadius: '4px', background: '#f0f0f0' }}>
                        <HamburgerMenuIcon />
                      </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Content
                      sideOffset={5}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        padding: '5px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <DropdownMenu.Item onClick={() => alert(`Viewing ${user.name}`)}>
                        View
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => alert(`Editing ${user.name}`)}>
                        Edit
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onClick={() => alert(`Deleting ${user.name}`)}>
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      </div>
      
    );
};

export default AdminConsoleView;