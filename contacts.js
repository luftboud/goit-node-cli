import fs from "fs/promises"; 
import path from 'path';
import { nanoid } from 'nanoid'

const contactsPath = path.join('db', 'contacts.json');

export  async function listContacts() {
    try {
        const result = await fs.readFile(contactsPath);
        const listOfCont = JSON.parse(result)
        console.table(listOfCont);
    } catch(err) {
        console.log(err);
  }
}

export  async function getContactById(contactId) {
  try {
      const result = await fs.readFile(contactsPath);
      const listOfCont = JSON.parse(result)
      const cont = listOfCont.find((el) => el.id === contactId)
      if (cont === undefined) {
          console.log("there is no such a contacts!(null)");
          return
      }
      console.log(cont);
    } catch(err) {
        console.log(err);
  }
}

export async function removeContact(contactId) {
    const result = await fs.readFile(contactsPath);
    const listOfCont = JSON.parse(result);
    const index = listOfCont.findIndex((el) => el.id === contactId)
    if (index === -1) {
        console.log("there is no such a contacts!(null)");
        return
    }
    const newList = listOfCont.splice(index, 1);
    console.log(newList);
    fs.writeFile(contactsPath, JSON.stringify(listOfCont))
}

export async function addContact(name, email, phone) {
    const contact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    console.log(contact);
    const result = await fs.readFile(contactsPath);
    const listOfCont = JSON.parse(result);
    listOfCont.push(contact);
    fs.writeFile(contactsPath, JSON.stringify(listOfCont))
}

