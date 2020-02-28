from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from recipe.models import Recipe, Ingredient

from recipe.serializers import RecipeSerializer

RECIPES_URL = reverse('recipe:recipe-list')

def detail_url(recipe_id):
    """Return recipe detail URL"""
    return reverse('recipe:recipe-detail', args=[recipe_id])

def sample_ingredient(name='Sample ingredient'):
    """Create and return a sample ingredient"""
    return Ingredient.objects.create(name=name)

def sample_recipe(**params):
    """Create and return a sample recipe"""
    defaults = {
        'name': 'Sample recipe',
        'description': 'Sample recipe description'
    }
    defaults.update(params)
    return Recipe.objects.create(**defaults)


class RecipeApiTests(TestCase):

    def setUp(self):
        self.cient = APIClient()

    def test_list_recipes(self):
        """Test retrieving a list of recipes"""
        sample_recipe()
        sample_recipe()

        res = self.client.get(RECIPES_URL)

        recipes = Recipe.objects.all().order_by('-id')
        serializer = RecipeSerializer(recipes, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertCountEqual(res.data, serializer.data)


    def test_create_recipe(self):
        """Test create a simple recipe"""
        ingredient1 = sample_ingredient(name="Test 1")
        ingredient2 = sample_ingredient(name="Test 2")

        payload = {
            "name": "Sample recipe",
            "description": "Sample recipe description",
            'ingredients': [ingredient1.id, ingredient2.id]
        }

        res = self.client.post(RECIPES_URL, payload, content_type='application/json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        returned_recipe = Recipe.objects.get(id=res.data['id'])

        ingredients = returned_recipe.ingredients.all()
        self.assertEqual(ingredients.count(), 2)
        self.assertIn(ingredient1, ingredients)
        self.assertIn(ingredient2, ingredients)

    def test_patch_recipe(self):
        """Test update some fields of a recipe"""
        recipe = sample_recipe()
        ingredient = sample_ingredient(name='Test 1')
        recipe.ingredients.add(ingredient)
        new_ingredient = sample_ingredient(name='New Test 1')

        payload = {
            'name': 'Sample recipe',
            'description': 'Sample recipe description',
            'ingredients': [new_ingredient.id]
        }

        url = detail_url(recipe.id)
        res = self.client.patch(url, payload, content_type='application/json')

        recipe.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(recipe.name, payload['name'])
        ingredients = recipe.ingredients.all()
        self.assertEqual(len(ingredients), 1)
        self.assertIn(new_ingredient, ingredients)

    def test_delete_recipe(self):
        """Test delete a recipe by id"""
        recipes = Recipe.objects.all()
        recipe = sample_recipe()

        res = self.client.delete(detail_url(recipe.id))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        serializer1 = RecipeSerializer(recipes, many=True)
        serializer2 = RecipeSerializer(recipe, many=False)

        self.assertNotIn(serializer2.data, serializer1.data)
