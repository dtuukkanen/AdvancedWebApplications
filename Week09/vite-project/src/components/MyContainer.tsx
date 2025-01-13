import React, { useState } from 'react';
import MyList from './MyList';
import { TItem } from '../types';

const MyContainer: React.FC = () => {
    // Define the header and initial items
    const header = "My Item List";
    const [items, setItems] = useState<TItem[]>([
        { id: '1', text: 'This is the first task', clicked: false },
        { id: '2', text: 'This is second task', clicked: false },
    ]);
    const [newItemText, setNewItemText] = useState('');

    // Add a new item to the list
    const addItem = () => {
        const id = (items.length + 1).toString();
        setItems([...items, { id, text: newItemText, clicked: false }]);
        setNewItemText(''); // Clear the textarea after adding the item
    };

    // Update the clicked status of an item
    const updateClicked = (id: string) => {
        const newItems = items.map((item) => {
            if (item.id === id) {
                return { ...item, clicked: !item.clicked };
            }
            return item;
        });
        setItems(newItems);
    }

    return (
        <div>
            <MyList header={header} items={items} updateList={updateClicked} />
            <textarea 
                value={newItemText} 
                onChange={(e) => setNewItemText(e.target.value)}
            />
            <button onClick={addItem}>Add Item</button>
        </div>
    );
};

export default MyContainer;
