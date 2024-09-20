import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'; // For interactive menus
import * as Checkbox from '@radix-ui/react-checkbox'; // Optional: For selecting rows
import { CheckIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'; // Optional: For checkbox styling
import "@/css/styles.css"; // Adjust the path if necessary
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pages } from '@/components/custom/Pages/Pages';

const AdminConsoleView: React.FC = () => {
    
  const users = [
    { id: 1, name: 'A', age: 30, occupation: 'None', location: 'Nowhere', },
    { id: 2, name: 'B', age: 25, occupation: 'No', location: 'Nah', },
    { id: 3, name: 'C', age: 35, occupation: 'Rice farmer', location: 'Asia', },
    { id: 4, name: 'A', age: 30, occupation: 'None', location: 'Nowhere',  },
    { id: 5, name: 'B', age: 25, occupation: 'No', location: 'Nah',  },
    { id: 6, name: 'C', age: 35, occupation: 'Rice farmer', location: 'Asia', },
    { id: 7, name: 'A', age: 30, occupation: 'None', location: 'Nowhere', },
    { id: 8, name: 'B', age: 25, occupation: 'No', location: 'Nah', },
    { id: 9, name: 'C', age: 35, occupation: 'Rice farmer', location: 'Asia', },
  ];
    
    return (
      <main className="admin-page">
        <div className="w-full overflow-x-auto">
          <h1>Admin Console</h1>
          <Table className="w-full border-collapse border border-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-left">Select</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} style={{ borderRight: '1px black', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                  {/* Select Checkbox */}
                  <TableCell>
                    <Checkbox.Root className="CheckboxRoot">
                      <Checkbox.Indicator className="CheckboxIndicator">
                        <CheckIcon />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                  </TableCell>
                  
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.occupation}</TableCell>
                  <TableCell>{user.location}</TableCell>

                  {/* DropdownMenu for Actions */}
                  <TableCell className='text-right'>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button style={{ padding: '5px', borderRadius: '4px', background: '#f0f0f0'}}>
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
                        <DropdownMenu.Item onClick={() => alert(`Ressting ${user.name}'s password`)}>
                          Reset password...
                        </DropdownMenu.Item>
                        <DropdownMenu.Item onClick={() => alert(`Deleting ${user.name}`)}>
                          Delete
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        <Pages />
      </div>
    </main>
      
    );
};

export default AdminConsoleView;