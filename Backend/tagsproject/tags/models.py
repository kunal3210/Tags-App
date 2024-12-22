from django.db import models


class TreeNode(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        related_name='children',
        null=True,
        blank=True
    )
    data = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name
