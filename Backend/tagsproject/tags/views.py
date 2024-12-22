from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TreeNode
from .serializers import TreeNodeSerializer


class TreeNodeView(APIView):
    def get(self, request):
        try:
            root_node = TreeNode.objects.filter(parent=None).first()
            if not root_node:
                return Response({"message": "No tree data found"}, status=status.HTTP_404_NOT_FOUND)

            serializer = TreeNodeSerializer(root_node)
            return Response({"tree": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        serializer = TreeNodeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        data = request.data.get('tree', {})
        serializer = TreeNodeSerializer(data=data)
        if serializer.is_valid():
            serializer.update(None, data)
            return Response({"message": "Tree updated successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        # Delete a node
        node = TreeNode.objects.get(pk=pk)
        node.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
