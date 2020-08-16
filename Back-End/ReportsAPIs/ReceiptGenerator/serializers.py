from rest_framework import serializers
from ReceiptGenerator.models import Price, Concept, Receipt


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = ['id',
                  'title',
                  'value',
                  'rate',
                  'creation_date',
                  'last_modified']


class ConceptSerializer(serializers.ModelSerializer):
    price = PriceSerializer(read_only=True)

    class Meta:
        model = Concept
        fields = ['id',
                  'name',
                  'description',
                  'creation_date',
                  'last_modified',
                  'price']


class ConceptSerializerRequest(serializers.ModelSerializer):
    class Meta:
        model = Concept
        fields = '__all__'


class ReceiptSerializer(serializers.ModelSerializer):
    concept = ConceptSerializer(read_only=True)

    class Meta:
        model = Receipt
        fields = ['id',
                  'title',
                  'description',
                  'creation_date',
                  'last_modified',
                  'concept']


class ReceiptSerializerRequest(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ['id',
                  'title',
                  'description',
                  'creation_date',
                  'last_modified',
                  'concept']
