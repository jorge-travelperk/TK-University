

from django.test import TestCase
import json

from recipe import models


class ModelTests(TestCase):

    def test_recipe_str(self):
        """Test the recipe string representation"""
        recipe = models.Recipe.objects.create(
            name="Test recipe",
            description="Test description for a recipe"
        )

        self.assertEqual(str(recipe), recipe.name)
