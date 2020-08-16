# Create your views here.

from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from ReceiptGenerator.models import Receipt, Concept
from ReceiptGenerator.serializers import ReceiptSerializer, ReceiptSerializerRequest, ConceptSerializer, \
    ConceptSerializerRequest, PriceSerializer


@api_view(['GET', 'POST', 'DELETE'])
def receipt_list(request):
    if request.method == 'GET':
        receipts = Receipt.objects.all()
        title = request.GET.get('title', None)
        if title is not None:
            receipts = receipts.filter(title__icontains=title)
            # if receipts == receipts:
            #    return JsonResponse({'message': 'The receipt does not exist'}, status=status.HTTP_404_NOT_FOUND)
        receipts_serializer = ReceiptSerializer(receipts, many=True)
        return JsonResponse(receipts_serializer.data, safe=False)
        # 'safe=False' for objects serialization

    elif request.method == 'POST':
        receipt_data = JSONParser().parse(request)
        receipt_serializer = ReceiptSerializerRequest(data=receipt_data)

        if receipt_serializer.is_valid():
            receipt_created = receipt_serializer.save()
            print('aca')
            print(receipt_created)
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
def concepts_list(request):
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
        count = Concept.objects.all().delete()
        return JsonResponse({'message': '{} Concepts were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)
