from rest_framework import serializers
from .models import TreeNode


class TreeNodeSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = TreeNode
        fields = ['name', 'data', 'children']

    def get_children(self, obj):
        child_nodes = obj.children.all()
        return TreeNodeSerializer(child_nodes, many=True).data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if representation['children']:
            representation.pop('data', None)
        elif representation['data'] or representation['data'] == '':
            representation.pop('children', None)
        return representation

    def create_or_update_node(self, node_data, parent=None):
        node, _ = TreeNode.objects.update_or_create(
            name=node_data.get('name'),
            parent=parent,
            defaults={'data': node_data.get('data', None)}
        )

        if 'children' in node_data:
            children = node_data['children']
            for child_data in children:
                self.create_or_update_node(child_data, parent=node)

            node.children.exclude(name__in=[child['name'] for child in children]).delete()

        return node

    def update(self, instance, validated_data):
        TreeNode.objects.filter(parent=None).delete()

        return self.create_or_update_node(validated_data)
