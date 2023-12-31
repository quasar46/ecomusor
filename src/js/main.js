// const minViewPort = (min = 380) => {
//     if (window.innerWidth <= min) {
//       const viewport = document.querySelector('[name="viewport"]');
//       if (viewport) viewport.setAttribute("content", `width=${min}, user-scalable=no`);
//     }
// };

// minViewPort();


customSelect(".mySelect");

new AirDatepicker('#airpicker', {
    onSelect: function (dateText, inst) {
        showTimes();
    }
});


const nextPage = function () {
    const arrBlocks = document.querySelectorAll('.white-block');

    arrBlocks.forEach(item => {
        if (item.querySelector('.next-page')) {
            const btnNext = item.querySelector('.next-page');
            btnNext.addEventListener('click', function () {
                btnNext.closest('.white-block').nextElementSibling.classList.remove('hidden');
                btnNext.closest('.white-block').classList.add('hidden');
            });
        }
        if (item.querySelector('.prev-page')) {
            const btnPrev = item.querySelector('.prev-page');
            btnPrev.addEventListener('click', function () {
                btnPrev.closest('.white-block').previousElementSibling.classList.remove('hidden');
                btnPrev.closest('.white-block').classList.add('hidden');
            })
        }


    })
}
nextPage();

const dropDown = document.querySelector('.dropdown');


const showDropdown = function () {
    const btnShow = document.querySelector('.header__user');
    btnShow.addEventListener('click', function (e) {
        dropDown.classList.toggle('active');
        if (e.target.closest('.dropdown__close')) {
            dropDown.classList.remove('active');
        } else if (e.target.closest('.dropdown__inner')) {
            dropDown.classList.add('active');
        }
    });

}
showDropdown();

const btnCheckPass = document.querySelectorAll('.input-password');
btnCheckPass.forEach(btn => {
    btn.addEventListener('click', function () {
        if (btn.checked == true) {
            btn.closest('.form__input').querySelector('.input').setAttribute('type', 'text');
        } else {
            btn.closest('.form__input').querySelector('.input').setAttribute('type', 'password');
        }
    })

})

const btnAddVideo = document.querySelector('#btnAddVideo');
const wrap = document.querySelector('.form__list--common');
const addNewBlock = function () {
    const newEl = document.createElement('div');
    newEl.classList.add('form__videos');
    newEl.innerHTML = `<div class="form__item w50"><div class="form__input"><input class="input" type="text" placeholder="Название ссылки на видео"></div></div><div class="form__item w50"><div class="form__input"><input class="input" type="text" placeholder="http://youtube.com/w..."><button class="form__input-delete"> <svg width="22" height="22"> <use xlink:href="#delete-icn"></use></svg></button></div></div>`;
    wrap.append(newEl);
}

const removeNewBlock = function () {
    const btnsDelete = document.querySelectorAll('.form__input-delete');
    btnsDelete.forEach(btn => {
        btn.addEventListener('click', function () {
            btn.closest('.form__videos').remove();
        });
    })
}
removeNewBlock();

const fAddNewBlock = function () {
    btnAddVideo.addEventListener('click', function () {
        addNewBlock();
        removeNewBlock();
    });
}

if (document.querySelector('#btnAddVideo')) {
    fAddNewBlock(removeNewBlock);
}

if (document.querySelector('#drop-area')) {
    // File input element
    const fileInput = document.getElementById('file-input');

    // Drop area element
    const dropArea = document.getElementById('drop-area');

    // Preview area element
    const previewArea = document.getElementById('preview');

    // Browse button element
    const browseBtn = document.getElementById('browserBtn');

    // Handle file drop
    function handleDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFiles(files);
    }

    // Handle file selection from browse button
    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    // Handle files and display preview
    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            // Read the file data and display preview
            reader.onload = function (event) {
                // Create a new file preview item
                const filePreview = document.createElement('div');
                filePreview.classList.add('file-item');
                filePreview.innerHTML = `
                <div class="file-info">
                <span class="file-name">
                ${file.name}
                </span>
                <span class="remove-btn" data-file="${file.name}">
                    <svg width="22px" height="22px"><use xlink:href="#close-item-icn"></svg>
                </span>
                </div>
          `;

                // Append the file preview item to the preview area
                previewArea.appendChild(filePreview);

                // Remove file on remove button click
                const removeBtn = filePreview.querySelector('.remove-btn');
                removeBtn.addEventListener('click', function (e) {
                    const fileName = this.getAttribute('data-file');
                    removeFile(fileName);
                });

                // Upload file and update progress bar
                uploadFile(file, filePreview);
            };

            reader.readAsDataURL(file);
        }
    }

    // Get file information
    function getFileInformation(file) {
        const fileSize = formatFileSize(file.size);
        const fileType = file.type || 'Unknown';
        return { size: fileSize, type: fileType };
    }

    // Remove file
    function removeFile(fileName) {
        const filePreview = document.querySelector(`.file-item .remove-btn[data-file="${fileName}"]`).parentNode.parentNode;
        filePreview.remove();
    }

    // Upload file and update progress bar
    function uploadFile(file, filePreview) {
        // const progressBar = filePreview.querySelector('.progress');

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'upload.php', true);

        const formData = new FormData();
        formData.append('file', file);
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Event listeners

    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    dropArea.addEventListener('drop', handleDrop);



    fileInput.addEventListener('change', handleFileSelect);

    browseBtn.addEventListener('click', function (e) {
        e.preventDefault();
        fileInput.click();
    });
}

var fileSelect = document.getElementById("fileSelect"),
    fileItem = document.getElementById("fileItem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener(
    "click",
    function (e) {
        if (fileItem) {
            fileItem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
    },
    false,
);

function handleFiles(files) {
    if (!files.length) {
        fileList.innerHTML = "<p>No1 files selected!</p>";
    } else {
        var list = document.createElement("ul");
        
        list.classList.add('listitems');
        fileList.appendChild(list);
        
        for (var i = 0; i < files.length; i++) {
            var li = document.createElement("li");
            list.appendChild(li);
            
            var remBtn = document.createElement("button");
            remBtn.classList.add('remove-item');
            remBtn.addEventListener('click', function() {
                this.closest('li').remove();
            })
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(files[i]);
            img.height = 49;
            img.onload = function () {
                window.URL.revokeObjectURL(this.src);
            };
            li.appendChild(img);
            li.appendChild(remBtn);
            // var info = document.createElement("span");
            // info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
            // li.appendChild(info);
        }
    }
}

