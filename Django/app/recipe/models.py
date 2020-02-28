

from django.db import models

class Ingredient(models.Model):
    """Ingredients to be added to recipe"""
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    """Recipe to be added to recipes"""
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    ingredients = models.ManyToManyField('Ingredient')

    def __str__(self):
        return self.name
