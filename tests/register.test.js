import {jest} from '@jest/globals'
import IntegrationTest from '../bin/run.js'


test('Request returns 3 JSONs containing the idDriver and idFollowUp registered', async () => {
    var data = await IntegrationTest()
    console.log(data)
    expect(data).toStrictEqual([
        {
          idDriver: 'WHZrSTlQUTVVOFYvdDNBcjRkdWVYUT09',
          idFollowUp: 'TERzOW1rS0U0UEhHbFd2MXVsNlQ3dkpLa3NQRE93VkIrRUZad1BjRjZCZTRSU1JUbkpRdFl3SU9wc3ZWVG1RTA=='
        },
        {
          idDriver: 'WHZrSTlQUTVVOFYvdDNBcjRkdWVYUT09',
          idFollowUp: 'TERzOW1rS0U0UEhHbFd2MXVsNlQ3dkpLa3NQRE93VkIrRUZad1BjRjZCZTRSU1JUbkpRdFl3SU9wc3ZWVG1RTA=='
        },
        {
          idDriver: 'WHZrSTlQUTVVOFYvdDNBcjRkdWVYUT09',
          idFollowUp: 'TERzOW1rS0U0UEhHbFd2MXVsNlQ3dkpLa3NQRE93VkIrRUZad1BjRjZCZTRSU1JUbkpRdFl3SU9wc3ZWVG1RTA=='
        }
      ]
      );
  });