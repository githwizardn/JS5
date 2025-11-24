 
import { results } from "./results.js"; // იმპორტი results.js-დან

 
document.addEventListener('DOMContentLoaded', () => {

    // --- დავალება 1: ღილაკის წაშლა დაჭერისას ---
    const removeSelfButton = document.getElementById('remove-self-button');

    if (removeSelfButton) {
        removeSelfButton.addEventListener('click', () => {
            removeSelfButton.remove();
        });
    }

    // --- დავალება 2:  ფოტოს დამატება ---
    const imageUrl = 'https://fastly.picsum.photos/id/534/1000/800.jpg?hmac=tFbU1nZ2RnQNroI_ToBhH-LFB8KNjyWoc3bVv5G9Wkw';
    const dynamicImage = document.createElement('img');
    
    dynamicImage.src = imageUrl;
    dynamicImage.alt = 'Random Image';
    dynamicImage.id = 'dynamic-image';
    
    // ვსვამთ პირველი <hr> ელემენტის შემდეგ
    const hrElement = document.querySelector('hr'); 
    if (hrElement) {
        // ვსვამთ <hr> ელემენტის შემდეგ, images-list-ის წინ
        document.body.insertBefore(dynamicImage, hrElement.nextElementSibling);
    } else {
        // Fallback, თუ <hr> არ არსებობს
        document.body.insertBefore(dynamicImage, document.getElementById('images-list'));
    }


    // --- დავალება 4: results მასივის რენდერინგი ---
    const imagesListSection = document.getElementById('images-list');

    // 4.2, 4.3, 4.4: .map-ის გამოყენებით ვქმნით HTML სტრინგს
    const cardsHtml = results.map(item => {
        const imageUrl = item.webImage ? item.webImage.url : 'placeholder.jpg';
        const title = item.title;
        const longTitle = item.longTitle;
        const webLink = item.links.web;
        const id = item.id;
        
        return `
            <div class="result-card" data-id="${id}">
                <div class="card-image-container">
                    <img src="${imageUrl}" alt="${title}" class="card-image">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${title}</h3>
                    
                    <!-- დავალება 5: დამატებითი ინფო, თავიდან დამალულია -->
                    <div class="card-details-info" style="display: none;">
                        <p class="card-long-title">${longTitle}</p>
                        <p>for more information visit <a href="${webLink}" target="_blank" class="link-text">here</a></p>
                    </div>

                    <!-- 4.4. ღილაკები -->
                    <div class="card-buttons">
                        <button class="card-button see-more-btn" data-action="details">see more details</button>
                        <button class="card-button remove-btn" data-action="remove">remove card</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // 4.5. HTML სტრინგის ჩასმა სექციაში
    imagesListSection.innerHTML = cardsHtml;


    // --- დავალება 5  ღილაკები  ---
    imagesListSection.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('card-button')) {
            const card = target.closest('.result-card');
            if (!card) return;
            
            const action = target.getAttribute('data-action');
            
            if (action === 'remove') {
                // Remove Card-ზე დაჭერა
                card.remove();
            } else if (action === 'details') {
                // See More Details-ზე დაჭერა
                const detailsInfo = card.querySelector('.card-details-info');
                
                if (detailsInfo.style.display === 'none') {
                    detailsInfo.style.display = 'block';
                    target.textContent = 'hide details';
                } else {
                    detailsInfo.style.display = 'none';
                    target.textContent = 'see more details';
                }
            }
        }
    });

});