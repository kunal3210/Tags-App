from django.urls import path
from .views import TreeNodeView

app_name = 'tags'

urlpatterns = [
    path('tree/', TreeNodeView.as_view(), name='tree-list'),
    path('tree/update', TreeNodeView.as_view(), name='tree-detail'),
]
