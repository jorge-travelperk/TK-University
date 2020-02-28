from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status

from rest_framework.decorators import action

from recipe.models import Recipe, Ingredient
from recipe import serializers

class IngredientViewSet(viewsets.ModelViewSet):
    """Manage ingredients in the database"""
    serializer_class = serializers.IngredientSerializer

    def get_queryset(self):
        """Return objects for current user"""
        self.queryset = Ingredient.objects.all()
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(recipe__isnull=False)

        return self.queryset.all().order_by('-name').distinct()

    def get_serializer_class(self):
        """Return appropiate serializer class"""
        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save()


class RecipeViewSet(viewsets.ModelViewSet):
    """Manage recipes in the DB"""
    serializer_class = serializers.RecipeSerializer

    def _params_to_ints(self, qs):
        """Convert a list of string IDs to a list of integers"""
        return [int(str_id) for str_id in qs.split(',')]

    def get_queryset(self):
        """Retrieve the list of recipes"""
        self.queryset = Recipe.objects.all()
        name = self.request.query_params.get('name', None)
        ingredients = self.request.query_params.get('ingredients')

        if name:
            return self.queryset.filter(name__startswith=name)

        if ingredients:
            ingredient_ids = self._params_to_ints(ingredients)
            print(ingredient_ids)
            self.queryset = queryset.filter(ingredients__id__in=ingredient_ids)


        return self.queryset

    def get_serializer_class(self):
        """Return appropiate serializer class"""
        if self.action == 'retrieve':
            return serializers.RecipeDetailSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new recipe"""
        serializer.save()
