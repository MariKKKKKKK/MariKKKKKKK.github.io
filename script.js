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

// this requests the file and executes a callback with the parsed result once
//   it is available
fetchJSONFile('http://prostoshubi.me/cv.json', function (data) {
    // do something with your data
    var name = document.querySelector('.name');
    var surname = document.querySelector('.surname');
    var contactList = document.querySelector('.contacts-list');
    var educationList = document.querySelector('.education-list');
    var skillsList = document.querySelector('.skills-list');
    var contacts = data.basicInfo.contact;
    var educationData = data.education;
    var skills = data.skills;
    var contactListItem = '';
    var educationListItem = '';
    var skillsListItem = '';
    name.innerHTML = data.basicInfo.name;
    surname.innerHTML = data.basicInfo.surname;

    for (var key in contacts) {
        let contactItem = contacts[key];
        console.log(contactItem);
        contactListItem += '<li>' + contactItem + '</li>';
    }

    contactList.insertAdjacentHTML('beforeend', contactListItem);
    for (var key in educationData) {
        var educationItem = educationData[key];
        educationListItem += '<li>' + educationItem + '</li>';
    }
    educationList.insertAdjacentHTML('beforeend', educationListItem);
    for (var ind = 0; ind < skills.length; ind++) {
        var skillItem = skills[ind];
        skillsListItem += '<li>' + skillItem + '</li>';
    }
    skillsList.insertAdjacentHTML('beforeend', skillsListItem);
});