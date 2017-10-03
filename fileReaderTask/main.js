



document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                var data;
                console.log('e readAsText = ', e);
                console.log('e readAsText target = ', e.target);
                try {
                    data = JSON.parse(e.target.result);
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
                } catch (ex) {
                    var errorNode = document.querySelector('.error');
                    errorNode.innerHTML = "Your json is not of the suitable";
                }
            }
        })(f);
        reader.readAsText(f);
    }

}

document.getElementById('files').addEventListener('change', handleFileSelect, false);


