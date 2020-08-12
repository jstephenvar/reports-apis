from django.db import models


# Create your models here.

class Value(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    rate = models.CharField(max_length=200, blank=False, default='')
    creation_date = models.DateField()
    last_modified = models.DateField()

    class Meta:
        db_table = "receipt_value"


class Concept(models.Model):
    name = models.CharField(max_length=100, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    creation_date = models.DateField()
    last_modified = models.DateField()
    value = models.ForeignKey(Value, on_delete=models.CASCADE)

    class Meta:
        db_table = "receipt_concept"


class Receipt(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    creation_date = models.DateField()
    last_modified = models.DateField()
    concept = models.ForeignKey(Concept, on_delete=models.CASCADE)

    class Meta:
        db_table = "receipt"
