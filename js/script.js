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

function generatePDF() {
    // Récupérer les éléments de la liste des tâches
    var taskList = document.getElementById("taskList").innerHTML;

    // Récupérer les notes
    var notes = document.getElementById("notes").value;

    // Créer le contenu du PDF avec les tâches à faire et les notes
    var pdfContent = "<h2>Tâches à faire :</h2>" + taskList + "<h2>Notes :</h2><p>" + notes + "</p>";

    // <a> pour télécharger le PDF
    var link = document.createElement('a');
    link.setAttribute('download', 'todo_list.pdf');

    // Conversion du contenu en PDF (bibliothèque jsPDF)
    var pdf = new jsPDF();
    pdf.text(20, 20, 'Ma Todo List');
    pdf.fromHTML(pdfContent, 20, 30);

    // Objet Blob contenant le PDF
    var pdfBlob = pdf.output("blob");

    // URL pour le Blob
    var url = URL.createObjectURL(pdfBlob);

    // Lien de téléchargement
    link.href = url;

    // Démarrer le téléchargement
    link.click();
}

// Obtenir la date actuelle
const currentDate = new Date();
const currentDateElement = document.getElementById('currentDate');

// Formatage de la date Fr
const options = { weekday: 'long', year:'numeric',month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('fr-FR', options);

// Insérer la date dans HTML
currentDateElement.textContent = formattedDate;