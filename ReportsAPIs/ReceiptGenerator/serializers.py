from rest_framework import serializers
from ReceiptGenerator.models import Value, Concept, Receipt


class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = ('id',
                  'title',
                  'rate',
                  'creation_date',
                  'last_modified',)


class ConceptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concept
        fields = ('id',
                  'name',
                  'description',
                  'creation_date',
                  'last_modified',
                  'value',)


class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ('id',
                  'title',
                  'description',
                  'creation_date',
                  'last_modified',
                  'concept',)
