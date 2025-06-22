document.addEventListener('DOMContentLoaded', () => {
    // Modal logic variables
    const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
    const modalImage = document.getElementById('modalImage');
    const heartBtn = document.getElementById('heartBtn');
    const heartIcon = document.getElementById('heartIcon');
    const heartCount = document.getElementById('heartCount');
    let currentImg = "";

    const shareFacebook = document.getElementById('shareFacebook');
    const shareInstagram = document.getElementById('shareInstagram');
    const copyLink = document.getElementById('copyLink');
    const copyMsg = document.getElementById('copyMsg');

    // Store heart counts per image
    const heartCounts = {};

    loadGallery();

    function loadGallery() {
        const gallery = document.getElementById('gallery-images');
        if (gallery) {
            const images = [
                "IMG_1313.png", "IMG_1315.png", "IMG_1312.png", "IMG_1316.png", "IMG_1317.png", "IMG_1318.png",
                "IMG_1319.png", "IMG_1320.png", "IMG_1321.png", "IMG_1322.png", "IMG_1160.png", "IMG_1161.png",
                "IMG_1162.png", "IMG_1163.png", "IMG_1169.png", "IMG_1170.png", "IMG_1171.png", "IMG_1172.png",
                "IMG_1173.png", "IMG_1174.png", "IMG_1185.png", "IMG_1186.png", "IMG_1189.png", "IMG_1190.png",
                "IMG_1191.png", "IMG_1194.png", "IMG_1195.png", "IMG_1196.png", "IMG_1197.png", "IMG_1198.png",
                "IMG_1199.png", "IMG_1200.png", "IMG_1201.png", "IMG_1202.png", "IMG_1203.png", "IMG_1204.png",
                "IMG_1205.png", "IMG_1206.png", "IMG_1207.png", "IMG_1208.png", "IMG_1209.png", "IMG_1210.png",
                "IMG_1211.png", "IMG_1212.png", "IMG_1213.png", "IMG_1214.png", "IMG_1215.png", "IMG_1216.png",
                "IMG_1217.png", "IMG_1218.png", "IMG_1219.png", "IMG_1220.png", "IMG_1221.png", "IMG_1222.png",
                "IMG_1223.png", "IMG_1224.png", "IMG_1225.png", "IMG_1226.png", "IMG_1227.png", "IMG_1228.png",
                "IMG_1229.png", "IMG_1230.png", "IMG_1231.png", "IMG_1232.png", "IMG_1233.png", "IMG_1234.png",
                "IMG_1235.png", "IMG_1236.png", "IMG_1237.png", "IMG_1241.png", "IMG_1242.png", "IMG_1243.png",
                "IMG_1244.png", "IMG_1245.png", "IMG_1246.png", "IMG_1248.png", "IMG_1249.png", "IMG_1250.png",
                "IMG_1251.png", "IMG_1252.png", "IMG_1253.png", "IMG_1254.png", "IMG_1255.png", "IMG_1256.png",
                "IMG_1257.png", "IMG_1258.png", "IMG_1259.png", "IMG_1260.png", "IMG_1261.png", "IMG_1265.png",
                "IMG_1266.png", "IMG_1267.png", "IMG_1268.png", "IMG_1269.png", "IMG_1270.png", "IMG_1271.png",
                "IMG_1272.png", "IMG_1274.png", "IMG_1275.png", "IMG_1276.png", "IMG_1277.png",
                "IMG_1278.png", "IMG_1279.png", "IMG_1280.png", "IMG_1281.png", "IMG_1282.png", "IMG_1283.png",
                "IMG_1284.png", "IMG_1285.png", "IMG_1286.png", "IMG_1287.png", "IMG_1288.png", "IMG_1289.png",
                "IMG_1290.png", "IMG_1291.png", "IMG_1292.png", "IMG_1293.png", "IMG_1294.png", "IMG_1295.png",
                "IMG_1296.png", "IMG_1297.png", "IMG_1298.png", "IMG_1299.png", "IMG_1300.png", "IMG_1301.png",
                "IMG_1302.png", "IMG_1303.png", "IMG_1304.png", "IMG_1305.png", "IMG_1306.png", "IMG_1309.png",
                "IMG_1310.png", "IMG_1311.png"


            ];
            images.forEach(img => heartCounts[img] = 0);

            const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
            const maxImages = isIndexPage ? 6 : images.length;

            images.slice(0, maxImages).forEach((src, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6 position-relative';

                // Container for image and overlay
                const container = document.createElement('div');
                container.className = 'gallery-img-container position-relative overflow-hidden rounded-4 mb-3';

                // The image
                const img = document.createElement('img');
                img.src = `photos/${src}`;
                img.alt = 'Gallery Image';
                img.className = 'gallery-img img-fluid w-100 d-block';
                img.loading = 'lazy';

                // Overlay for buttons
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay d-flex justify-content-center align-items-end';

                overlay.innerHTML = `
                    <div class="gallery-btns d-flex justify-content-center gap-2 w-100 pb-3">
                        <button class="btn btn-outline-light btn-sm gallery-heart" title="Heart"><i class="fa-regular fa-heart"></i></button>
                        <a href="photos/${src}" download class="btn btn-outline-light btn-sm" title="Download"><i class="fa fa-download"></i></a>
                        <button class="btn btn-outline-light btn-sm gallery-share" title="Share"><i class="fa fa-share-nodes"></i></button>
                    </div>
                `;

                // Attach event listener for share button
                overlay.querySelector('.gallery-share').addEventListener('click', function(e) {
                    e.preventDefault();
                    const imgUrl = window.location.origin + `/photos/${src}`;
                    // Share the direct image URL on Facebook
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imgUrl)}`,
                        '_blank'
                    );
                });

                container.appendChild(img);
                container.appendChild(overlay);
                col.appendChild(container);
                gallery.appendChild(col);
            });
        }
    }

    function showModal(src) {
        currentImg = src;
        modalImage.src = `photos/${src}`;
        updateHeart();
        // Facebook share link
        const url = window.location.origin + '/photos/' + src;
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        // Instagram: can't share directly, but can open Instagram
        shareInstagram.href = `https://www.instagram.com/`;
        // Copy link
        copyLink.onclick = function() {
            navigator.clipboard.writeText(url).then(() => {
                copyMsg.style.display = 'block';
                setTimeout(() => copyMsg.style.display = 'none', 1500);
            });
        };
        photoModal.show();
    }

    function updateHeart() {
        heartCount.textContent = heartCounts[currentImg];
        if (localStorage.getItem('hearted_' + currentImg)) {
            heartIcon.className = 'fa-solid fa-heart';
            heartBtn.classList.add('active');
        } else {
            heartIcon.className = 'fa-regular fa-heart';
            heartBtn.classList.remove('active');
        }
    }

    heartBtn.addEventListener('click', function () {
        if (!localStorage.getItem('hearted_' + currentImg)) {
            heartCounts[currentImg]++;
            localStorage.setItem('hearted_' + currentImg, '1');
        } else {
            heartCounts[currentImg]--;
            localStorage.removeItem('hearted_' + currentImg);
        }
        updateHeart();
    });

    // Tooltip initialization (optional)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});