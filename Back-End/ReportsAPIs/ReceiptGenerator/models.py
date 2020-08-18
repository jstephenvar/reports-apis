from django.db import models


# Create your models here.


class Price(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    value = models.BigIntegerField()
    rate = models.CharField(max_length=200, blank=False, default='')
    creation_date = models.DateField()
    last_modified = models.DateField(blank=True, null=True)

    class Meta:
        db_table = "udes_price"
        ordering = ['id']

    def __str__(self):
        return 'id: %d:, name: %s, value : %s' % (self.id, self.title, self.rate)


class Concept(models.Model):
    name = models.CharField(max_length=100, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    creation_date = models.DateField()
    last_modified = models.DateField(blank=True, null=True)
    price = models.OneToOneField(
        Price,
        on_delete=models.CASCADE
    )

    class Meta:
        db_table = "udes_concept"

    def __str__(self):
        return "{\'id\': %d, \'name\': \'%s\', \'description\': \'%s\', \'value\' : \'%s\'}" % (
            self.id, self.name, self.description, self.price)


class Receipt(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')
    creation_date = models.DateField()
    last_modified = models.DateField(blank=True, null=True)
    concept = models.ForeignKey(Concept, related_name="receipt", on_delete=models.PROTECT)

    class Meta:
        db_table = "udes_receipt"
        ordering = ['id']
