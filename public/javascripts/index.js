let phoneToEdit = '';

const API_URL = {
    CREATE: 'contacts/create',
    READ: 'contacts',
    UPDATE: 'contacts/update',
    DELETE: 'contacts/delete'
};

// if we are on demo site
if (true || location.host === "nmatei.github.io") {
    API_URL.READ = 'data/contacts.json';
}

const loadContacts = () => {
    $.ajax(API_URL.READ).done(contacts => {
        console.info('contacts loaded', contacts);
        window.globalContacts = contacts;
        displayContacts(contacts);
    });
}

function saveContact() {
    const firstName = document.querySelector('input[name=firstName]').value;
    const lastName = $('input[name=lastName]').val();
    const phone = $('input[name=phone]').val();
    console.debug('saveContact...', firstName, lastName, phone);

    const actionUrl = phoneToEdit ? API_URL.UPDATE + '?id=' + phoneToEdit : API_URL.CREATE;
    
    $.post(actionUrl, {
        firstName, // shortcut from ES6 (key is the same as value variable name)
        lastName,
        phone: phone // ES5 (key = value)
    }).done(response => {
        console.warn('done create contact', response);
        phoneToEdit = '';
        if (response.success) {
            loadContacts();
        }
    });
}

function displayContacts(contacts) {
    var rows = contacts.map(contact => {
        //console.log('transform contact', contact);
        const phone = contact.phone;
        const info = phone.indexOf('http') === 0 ? `<a target="_blank" href="${phone}">${phone.replace('https://github.com/', '')}</a>` : phone;
        return `<tr>
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${info}</td>
            <td>
                <a href="${API_URL.DELETE}?id=${contact.id}">&#10006;</a>
                <a href="#" class="edit" data-id="${contact.id}">&#9998;</a>
            </td>
        </tr>`;
    });
    //console.warn('rows', rows);
    document.querySelector('tbody').innerHTML = rows.join('');
}

function initEvents() {
    // TODO use native click
    $("tbody").delegate( "a.edit", "click", function() {
        phoneToEdit = this.getAttribute('data-id');

        var contact = globalContacts.find(contact => contact.id == phoneToEdit);
        console.log('edit', phoneToEdit, contact);
        
        document.querySelector('input[name=firstName]').value = contact.firstName;
        $('input[name=lastName]').val(contact.lastName);
        $('input[name=phone]').val(contact.phone);
    });

    document.getElementById('search').addEventListener('input', doSearch);
}

function doSearch(ev) {
    // var value = document.getElementById('search').value;
    const value = this.value.toLowerCase();
    
    var filteredContacts = globalContacts.filter(function (contact) {
        return contact.firstName.toLowerCase().includes(value) ||
            contact.lastName.toLowerCase().includes(value) ||
            contact.phone.toLowerCase().includes(value);
    });

    displayContacts(filteredContacts);
}

// - start app

loadContacts();
initEvents();