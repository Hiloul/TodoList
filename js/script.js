function addTask() {
    var input = document.getElementById("taskInput");
    var task = input.value.trim(); // Supprimer les espaces vides avant et après le texte de la tâche
    if (task === "") {
        alert("Veuillez entrer une tâche !");
        return;
    }
    var ul = document.getElementById("taskList");
    var li = document.createElement("li");

    // Checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "custom-checkbox";
    checkbox.addEventListener("change", function() {
        if (this.checked) {
            // Marquer la tâche comme terminée
            li.style.textDecoration = "line-through";
        } else {
            // Marquer la tâche comme non terminée
            li.style.textDecoration = "none";
        }
    });

    // Supprimer la tâche
    var cross = document.createElement("span");
    cross.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    cross.className = "close";

    // Clic pour supprimer la tâche
    cross.addEventListener("click", function() {
        var listItem = this.parentElement;
        listItem.remove();
        // Vérifier s'il reste des tâches
        if (ul.getElementsByTagName("li").length === 0) {
            document.getElementById("downloadBtn").style.display = "none"; // Masquer le bouton PDF
        }
    });

    // Ajouter les éléments à la liste
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task));
    li.appendChild(cross);
    ul.appendChild(li);
    input.value = "";

    // Afficher le bouton PDF si ce n'est pas déjà fait
    if (ul.getElementsByTagName("li").length === 1) {
        document.getElementById("downloadBtn").style.display = "block";
    }
}

// Obtenir la date actuelle
const currentDate = new Date();
const currentDateElement = document.getElementById('currentDate');

// Formatage de la date Fr
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('fr-FR', options);

// Insérer la date dans HTML
currentDateElement.textContent = formattedDate;
