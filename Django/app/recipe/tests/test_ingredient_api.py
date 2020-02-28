from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from recipe.models import Ingredient

from recipe.serializers import IngredientSerializer

INGREDIENTS_URL = reverse('recipe:ingredient-list')

def detail_url(ingredient_id):
    return reverse('recipe:ingredient-detail', args=[ingredient_id])


class RecipeApiTests(TestCase):

    def setUp(self):
        self.cient = APIClient()

    def test_list_ingredients(self):
        """Test retrieving a list of ingredients"""
        Ingredient.objects.create(name="Ingredient test 1")
        Ingredient.objects.create(name="Ingredient test 2")

        res = self.client.get(INGREDIENTS_URL)

        ingredients = Ingredient.objects.all().order_by('-id')
        serializer = IngredientSerializer(ingredients, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertCountEqual(res.data, serializer.data)

    def test_create_ingredient(self):
        """Test create a sample ingredient"""
        payload = {
            "name": "Test ingredient"
        }

        res = self.client.post(INGREDIENTS_URL, payload, content_type='application/json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        ingredient = Ingredient.objects.get(id=res.data['id'])

    def test_delete_ingredient(self):
        """Test delete an ingredient by id"""
        ingredients = Ingredient.objects.all()
        ingredient = Ingredient.objects.create(name="Test ingredient")

        res = self.client.delete(detail_url(ingredient.id))

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)

        serializer1 = IngredientSerializer(ingredients, many=True)
        serializer2 = IngredientSerializer(ingredient, many=False)

        self.assertNotIn(serializer2.data, serializer1.data)
