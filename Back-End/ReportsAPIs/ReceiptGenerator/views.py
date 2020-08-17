# Create your views here.

from django.http.response import JsonResponse
from django.db import Error
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from ReceiptGenerator.models import Receipt, Concept, Price
from ReceiptGenerator.serializers import ReceiptSerializer, ReceiptSerializerRequest, ConceptSerializer, \
    ConceptSerializerRequest, PriceSerializer


@api_view(['GET', 'POST', 'DELETE'])
def receipt_list(request):
    if request.method == 'GET':
        receipts = Receipt.objects.all()
        title = request.GET.get('title', None)
        if title is not None:
            receipts = receipts.filter(title__icontains=title)
        receipts_serializer = ReceiptSerializer(receipts, many=True)
        return JsonResponse(receipts_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        receipt_data = JSONParser().parse(request)
        receipt_serializer = ReceiptSerializerRequest(data=receipt_data)

        if receipt_serializer.is_valid():
            receipt_created = receipt_serializer.save()
            return JsonResponse(receipt_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(receipt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        count = Receipt.objects.all().delete()
        return JsonResponse({'message': '{} Receipts were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def receipt_detail(request, pk):
    try:
        receipt = Receipt.objects.get(pk=pk)
    except Receipt.DoesNotExist:
        return JsonResponse({'message': 'The receipt does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        receipt_serializer = ReceiptSerializer(receipt)
        return JsonResponse(receipt_serializer.data)

    elif request.method == 'PUT':
        receipt_data = JSONParser().parse(request)
        receipt_serializer = ReceiptSerializerRequest(receipt, data=receipt_data)
        if receipt_serializer.is_valid():
            receipt_serializer.save()
            return JsonResponse(receipt_serializer.data)
        return JsonResponse(receipt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        receipt.delete()
        return JsonResponse({'message': 'Receipt was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST', 'DELETE'])
def concept_list(request):
    if request.method == 'GET':
        concepts = Concept.objects.all()
        concepts_serializer = ConceptSerializer(concepts, many=True)
        return JsonResponse(concepts_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        concept_data = JSONParser().parse(request)
        # Get price
        price = concept_data.get('price', None)
        # Save Price
        price_serializer = PriceSerializer(data=price)
        if price_serializer.is_valid():
            price_serializer.save()
            concept_data_new = {'name': concept_data.get('name', None),
                                'description': concept_data.get('description', None),
                                'creation_date': concept_data.get('creation_date', None),
                                'last_modified': concept_data.get('last_modified', None),
                                'price': price_serializer.data.get('id', None)}
            # Save concept
            concept_serializer = ConceptSerializerRequest(data=concept_data_new)

            if concept_serializer.is_valid():
                concept_serializer.save()
                return JsonResponse(concept_serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(concept_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(price_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            count = Concept.objects.all().delete()
        except Error as e:
            return JsonResponse({'message': e.__str__()}, status=status.HTTP_404_NOT_FOUND)
        return JsonResponse({'message': '{} Concepts were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def concept_detail(request, pk):
    try:
        concept = Concept.objects.get(pk=pk)
    except Receipt.DoesNotExist:
        return JsonResponse({'message': 'The concept does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        concept_serializer = ConceptSerializer(concept)
        return JsonResponse(concept_serializer.data)

    elif request.method == 'PUT':
        concept_data = JSONParser().parse(request)
        # Get price
        price_data = concept_data.get('price', None)
        # Get from Db
        try:
            price = Price.objects.get(pk=price_data.get('id', None))
        except Receipt.DoesNotExist:
            return JsonResponse({'message': 'The price for update does not exist'}, status=status.HTTP_404_NOT_FOUND)
        # Update price
        price_serializer = PriceSerializer(price, data=price_data)
        if price_serializer.is_valid():
            price_serializer.save()
            # Extract serializer for concept
            concept_serializer = ConceptSerializer(concept, data=concept_data)
            # Update concept
            if concept_serializer.is_valid():
                concept_serializer.save()
                return JsonResponse(concept_serializer.data)
            return JsonResponse(concept_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return JsonResponse(price_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        try:
            concept.delete()
            price = Price.objects.get(pk=concept.price.pk)
            price.delete()
        except Error as e:
            return JsonResponse({'message': e.__str__()}, status=status.HTTP_404_NOT_FOUND)
    return JsonResponse({'message': 'Concept was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
