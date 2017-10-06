function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function () {
        if (httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            if (callback) callback(data);
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}


fetchJSONFile('http://prostoshubi.me/cv.json', function (data) {

    function getListItemsHTML() {
        var contacts = data.basicInfo.contact;
        var educationData = data.education;
        var skills = data.skills;
        var contactListItem = '';
        var educationListItem = '';
        var skillsListItem = '';
        for (var key in contacts) {
            let contactItem = contacts[key];
            console.log(contactItem);
            contactListItem += '<li>' + contactItem + '</li>';
        }

        for (var key in educationData) {
            var educationItem = educationData[key];
            educationListItem += '<li>' + educationItem + '</li>';
        }

        for (var ind = 0; ind < skills.length; ind++) {
            var skillItem = skills[ind];
            skillsListItem += '<li>' + skillItem + '</li>';
        }

        return { contactListItem, educationListItem, skillsListItem };
    }


    function insertDataToPage() {
        var name = document.querySelector('.name');
        var surname = document.querySelector('.surname');
        var contactList = document.querySelector('.contacts-list');
        var educationList = document.querySelector('.education-list');
        var skillsList = document.querySelector('.skills-list');

        var contactListItem = getListItemsHTML().contactListItem, 
        educationListItem = getListItemsHTML().educationListItem, 
        skillsListItem = getListItemsHTML().skillsListItem;

        name.insertAdjacentHTML('beforeend', data.basicInfo.name);
        surname.insertAdjacentHTML('beforeend', data.basicInfo.surname);
        contactList.insertAdjacentHTML('beforeend', contactListItem);
        educationList.insertAdjacentHTML('beforeend', educationListItem);
        skillsList.insertAdjacentHTML('beforeend', skillsListItem);
    }
    insertDataToPage();
});