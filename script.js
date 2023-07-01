var meal;
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        var recName = document.getElementById('recipeName');
        
        function generate() {
            var input = recName.value;
            if (input != '') {
                result.style.display = 'block';
                document.getElementById('none').style.display = 'none';
                document.getElementById('not').style.display = 'none';

                fetch(url + input)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        meal = data.meals[0];
                        result.innerHTML = `
            <img src='${meal.strMealThumb}'>
            <div class='details'>
              <h2>${meal.strMeal} (${meal.strCategory})</h2>
              <h2>~${meal.strArea}~</h2>
              <div class='ingredients'>
                <h2 style="background-color: transparent; font-weight: lighter; margin-bottom: 20px;">Ingredients</h2>
                <ul id='ul'></ul>
              </div>
            </div>
            <div style='display:flex; width:100%; align-items:center; justify-content: flex-end;'>
              <a href='recipe.html'><button class='rec' onclick='rec()'>View Recipe</button></a>
            </div>
          `;

                        let index = 1;
                        while (meal[`strIngredient${index}`] && meal[`strMeasure${index}`]) {
                            const ingredient = meal[`strIngredient${index}`];
                            const measure = meal[`strMeasure${index}`];
                            document.getElementById('ul').innerHTML += `<li>${measure} ${ingredient}</li>`;
                            index++;
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        document.getElementById('not').style.display = 'block';
                        document.getElementById('none').style.display = 'none';
                        result.style.display = 'none';
                    });
                } else {
                    document.getElementById('not').style.display = 'none';
                document.getElementById('none').style.display = 'block';
                result.style.display = 'none';
            }
        }

        function rec() {
            localStorage.setItem('img', meal.strMealThumb);
            localStorage.setItem('name', meal.strMeal);
            localStorage.setItem('instructions', meal.strInstructions);
            localStorage.setItem('alink', meal.strYoutube);
            localStorage.setItem('srclink', meal.strSource);
        }
