const { program } = require("commander");
const contacts = require("./contacts");

program
  .option("-a, --action <type>", "list, get, add, remove")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "name")
  .option("-e, --email <type>", "email")
  .option("-p, --phone <type>", "phone");

program.parse(process.argv);
console.log(process.argv);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      return allContacts;
    case "get":
      const contact = await contacts.getContactById(id);
      console.table(contact);
      return contact;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      return newContact;
    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      return removeContact;
    default:
      console.log("You typing unknown action");
      break;
  }
}

invokeAction(program.opts());
